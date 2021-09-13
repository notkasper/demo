import sys
import os
import json
import pandas as pd
import numpy
import matplotlib.pyplot as plt

filepath = "./Yield_MOCK.csv"

df = pd.read_csv(filepath)

x = df["Area"]
y = df["Yield"]

mymodel = numpy.poly1d(numpy.polyfit(x, y, 3))

myline = numpy.linspace(1, 22, 100)

plt.scatter(x, y)
plt.plot(myline, mymodel(myline))
plt.savefig('area-yield.png')

output = {"filename": "area-yield.png"}
print(json.dumps(output))
