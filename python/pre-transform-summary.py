import numpy as np
from js import df

data_type = df.dtypes.astype(str)
missing_count = df.isna().sum()
stats_min = df.min()
stats_max = df.max()
zero_count = df.isin([0]).sum()

pre_transform_summary = pd.DataFrame({
    'data_type': data_type,
    'missing_count': missing_count,
    'max': stats_max,
    'min': stats_min,
    'zero_count': zero_count,
})

pre_transform_summary = pre_transform_summary.transpose()
pre_transform_summary.to_dict()