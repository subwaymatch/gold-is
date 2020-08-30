import numpy as np

data_type = df.dtypes
distinct_count = df.nunique()
unique_percentage = distinct_count / df.shape[0]
is_unique = distinct_count == df.shape[0]
missing_count = df.isna().sum()
missing_percentage = missing_count / df.shape[0]
memory_usage = df.memory_usage(deep=True).drop('Index')
stats_mean = df.mean()
stats_min = df.min()
stats_max = df.max()
infinite_count = df.isin([np.inf, -np.inf]).sum()
infinite_percentage = infinite_count / df.shape[0]
zero_count = df.isin([0]).sum()
zero_percentage = zero_count / df.shape[0]

columns_summary = pd.DataFrame({
    'type': data_type,
    'distinct_count': distinct_count,
    'unique_percentage': unique_percentage,
    'is_unique': is_unique,
    'missing_count': missing_count,
    'missing_percentage': missing_percentage,
    'infinite_count': infinite_count,
    'infinite_percentage': infinite_percentage,
    'mean': stats_mean,
    'max': stats_max,
    'min': stats_min,
    'zero_count': zero_count,
    'zero_percentage': zero_percentage,
    'memory_usage': memory_usage,
})

columns_summary = columns_summary.transpose()

columns_summary