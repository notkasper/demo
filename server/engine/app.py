import sys
import json

x = {
    "sum": int(sys.argv[1]) + int(sys.argv[2])
}

print(json.dumps(x))
