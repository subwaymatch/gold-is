import pandas as pd
import numpy
# import sklearn
from js import csv_string

df = None

CSV_STRING_IO = io.StringIO(csv_string)

# Load 
df = pd.read_csv(CSV_STRING_IO, encoding='utf8')

df
# TODO: Delete CSV_STRING_IO from globals