// src/setup.ts
import "@solid-devtools/debugger/setup";
import {
  setClientVersion,
  setOwnerLocation,
  setSolidVersion,
  useLocator
} from "@solid-devtools/debugger/setup";
setClientVersion("0.29.2");
setSolidVersion("1.8.5", "1.8.0");
function setComponentLocation(location) {
  if (typeof location !== "string")
    return;
  setOwnerLocation(location);
}

export {
  useLocator,
  setComponentLocation
};
