import sys
import os
import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

crop = str(sys.argv[1])
print(crop)
print(crop)

filepath = "./Yield_MOCK.csv"

df = pd.read_csv(filepath)

x = df["Yield"]
y = df["Cost"]

mymodel = np.poly1d(np.polyfit(x, y, 3))

myline = np.linspace(0, np.amax(x), 100)

plt.scatter(x, y, 5, color="#19196c")
plt.plot(myline, mymodel(myline), color="#fd6400", linewidth=4)
plt.xlabel("Yield (Tonnes)")
plt.ylabel("Cost (Real)")
plt.savefig('../static/yield-cost.png')

output = {"filename": "yield-costd.png"}
print(json.dumps(output))
