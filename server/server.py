from flask import Flask, request, jsonify
from collections import Counter
import multiprocessing as mp
import re
import glob

app = Flask(__name__)


@app.route('/')
def hello():
    return "Server is Ready"


@app.route('/search/')
def search_words():
    ex_directory_path = request.args.get('directory_path')
    ex_words_file_path = request.args.get('words_file_path')
    word_to_search = request.args.get('word_to_search')

    frequency_by_word = count_the_words_in_files(directory_path=ex_directory_path, words_file_path=ex_words_file_path)
    sorted_files_name = show_sorted_by_word_count(word_to_search, frequency_by_word)

    return jsonify(sorted_files_name)


def count_the_words_in_files(words_file_path, directory_path):
    most_common_words = list(set(file2lst(words_file_path)))
    text_files_paths_lst = glob.glob(directory_path + "/**/*.txt", recursive=True)

    pool = mp.Pool(mp.cpu_count())
    words_frequency_by_file_name = \
        [pool.apply(create_words_frequency, args=(path, most_common_words)) for path in text_files_paths_lst]
    pool.close()

    return words_frequency_by_file_name


def create_words_frequency(path, most_common_words):
    words_cnt = Counter(file2lst(path))

    words_frequency = {}
    for word in most_common_words:
        words_frequency[word] = words_cnt[word]

    return path, words_frequency


def show_sorted_by_word_count(word, words_frequency_by_file):
    sorted_files_name = {}
    for frequency_tpl in words_frequency_by_file:
        sorted_files_name[frequency_tpl[0]] = frequency_tpl[1][word]
    sorted_frequency_lst = [k[0] for k in sorted(sorted_files_name.items(), key=lambda item: item[1])]

    return sorted_frequency_lst


def file2lst(path):
    file_txt = open(path).read().lower()
    return re.findall(r'\w+', file_txt)


@app.errorhandler(500)
def internal_error(error):
    return jsonify(error=f'internal server error: {error}')


@app.errorhandler(404)
def not_found(error):
    return jsonify(error=f'page not found: {error}')


# if __name__ == '__main__':
#     app.run(debug=True)
