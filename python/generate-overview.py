overview = {}

overview['numRows'] = df.shape[0]
overview['numCols'] = df.shape[1]
overview['numMissingCells'] = df.isna().sum().sum()
overview['missingCellsPercentage'] = overview['numMissingCells'] / (overview['numRows'] * overview['numCols'])
overview['numDuplicateRows'] = df.shape[0] - len(df.drop_duplicates())
overview['duplicateRowsPercentage'] = overview['numDuplicateRows'] / df.shape[0]
overview['memoryUsage'] = df.memory_usage(deep=True).sum()

overview