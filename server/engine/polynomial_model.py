import sys
import os
import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

filepath = "./Yield_MOCK.csv"

df = pd.read_csv(filepath)

x = df["Area"]
y = df["Yield"]

mymodel = np.poly1d(np.polyfit(x, y, 3))

myline = np.linspace(0, np.amax(x), 100)

plt.scatter(x, y, 5, color="#19196c")
plt.plot(myline, mymodel(myline), color="#fd6400", linewidth=4)
plt.xlabel("Area (acres)")
plt.ylabel("Yield (tonnes)")
plt.savefig('../static/area-yield.png')

output = {"filename": "area-yield.png"}
print(json.dumps(output))
