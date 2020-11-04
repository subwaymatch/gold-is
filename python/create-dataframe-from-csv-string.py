import pandas as pd
from js import csv_string

df_original = None
df = None

CSV_STRING_IO = io.StringIO(csv_string)

# Load 
df_original = pd.read_csv(CSV_STRING_IO, encoding='utf8')
df = df_original.copy()

df

# TODO: Delete CSV_STRING_IO from globals