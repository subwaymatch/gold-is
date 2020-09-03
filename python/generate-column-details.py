from js import df, selected_column

col = df[selected_column]

column_details = {
  'most_frequent': col.value_counts().head(10).to_dict()
}

if col.dtype == float or col.dtype == int:
  pass

column_details