summary = {}

summary['numRows'] = df.shape[0]
summary['numCols'] = df.shape[1]
summary['numMissingCells'] = df.isna().sum().sum()
summary['missingCellsPercentage'] = summary['numMissingCells'] / (summary['numRows'] * summary['numCols'])
summary['numDuplicateRows'] = df.shape[0] - len(df.drop_duplicates())
summary['duplicateRowsPercentage'] = summary['numDuplicateRows'] / df.shape[0]
summary['memoryUsage'] = df.memory_usage(deep=True).sum()

summary