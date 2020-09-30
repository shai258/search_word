import unittest
from .server import *


class Consts:
    words_file_path = '../most_common_words.txt'
    directory_path = '../isaac_mitchell'


class TestSearchWords(unittest.TestCase):
    def search_words(self):
        frequency_by_file = count_the_words_in_files(words_file_path=Consts.words_file_path,
                                                     directory_path=Consts.directory_path)
        print(show_sorted_by_word_count('the', frequency_by_file))
