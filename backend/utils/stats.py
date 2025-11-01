import pandas as pd

def process_csv(file_path):
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        return {"error": f"Failed to read CSV file: {str(e)}"}

    # Summary Statistics
    summary = {
        "Rows": len(df),
        "Columns": len(df.columns),
        "Missing Values": int(df.isnull().sum().sum()),
    }

    # Prepare chart data
    chartData = []
    numeric_cols = df.select_dtypes(include='number').columns

    if len(numeric_cols) > 0:
        col = numeric_cols[0]
        for i in range(min(10, len(df))):  # first 10 rows only
            chartData.append({
                "label": str(i + 1),
                "value": float(df[col].iloc[i])
            })
    else:
        chartData.append({"label": "No Numeric Data", "value": 0})

    return {"summary": summary, "chartData": chartData}
