// All the code down below was made by CST1229
// The only thing I (SamuelLouf) did was adaptating it

class ZipExt {
  constructor() {
    this.zip = null;
    this.zipPath = null;
  }

  // Utilities

  normalize(origin, path) {
    path = path.toString().replaceAll(/\\/g, "/");
    origin = origin.toString().replaceAll(/\\/g, "/");

    if (path.startsWith("/")) origin = "";
    else if (!origin.endsWith("/")) origin += "/";

    let parsedPath = origin + path;

    let split = parsedPath.split("/");

    let result = [];
    for (const i in split) {
      const part = split[i];
      if (part === ".") continue;
      if (part === "") {
        // First split of `/` is blank, so ignore in that case
        // Last split of a directory is also blank due to the /
        if (+i !== 0 && +i !== split.length - 1) {
          throw new Error("Cannot have empty directory names");
        }
        if (+i === 0) continue;
      }
      if (part === "..") {
        if (result.length <= 0) {
          throw new Error("Cannot go above root");
        }
        result.pop();
        continue;
      }
      result.push(part);
    }
    return "/" + result.join("/");
  }
  splitIntoParts(string, partLength) {
    const arr = [];
    for (let i = 0; i < string.length; i += partLength) {
      arr.push(string.substring(i, i + partLength));
    }
    return arr;
  }
  // get a file/folder by path
  getObj(path) {
    // JSZip.prototype.files seems to be a null-prototype object
    // it should be safe doing this
    return this.zip.files[path.substring(1)] || this.zip.files[path];
  }
  // create folders up to a certain path
  createFolders(path) {
    try {
      path = this.normalize(path, ".");

      let currentPath = "";
      for (const folder of path.split("/")) {
        if (folder === "") continue;
        if (currentPath !== "") currentPath += "/";
        currentPath += folder;
        this.zip.folder(currentPath);
      }
    } catch (e) {
      console.error(`Zip extension: Error creating folders for ${path}:`, e);
    }
  }

  /// Blocks

  createEmpty() {
    this.close();

    this.zip = new JSZip();
    this.zipPath = "/";
  }
  async open( TYPE, DATA ) {
    this.close();
    try {
      DATA = String(DATA);

      switch (TYPE) {
        case "base64":
        case "data: URL":
        case "URL":
          {
            if (TYPE === "base64")
              DATA = "data:application/zip;base64," + DATA;
            const resp = await fetch(DATA);
            DATA = await resp.blob();
          }
          break;
        case "hex":
          {
            if (!/^(?:[0-9A-F]{2})*$/i.test(DATA)) return;
            const dataArr = this.splitIntoParts(DATA, 2);
            DATA = Uint8Array.from(dataArr.map((o) => parseInt(o, 16)));
          }
          break;
        case "binary":
          {
            if (!/^(?:[01]{8})*$/i.test(DATA)) return;
            const dataArr = this.splitIntoParts(DATA, 8);
            DATA = Uint8Array.from(dataArr.map((o) => parseInt(o, 2)));
          }
          break;
      }

      this.zip = await JSZip.loadAsync(DATA, { createFolders: true });
      this.zipPath = "/";
    } catch (e) {
      console.error("Zip extension: Could not open zip file.", e);
    }
  }
  async getZip( TYPE, COMPRESSION ) {
    if (!this.zip) return "";
    try {
      COMPRESSION = Number(COMPRESSION);
      COMPRESSION = Math.max(Math.min(Math.round(COMPRESSION), 9), 0);

      const compType = COMPRESSION === 0 ? "STORE" : "DEFLATE";
      const options = {
        compression: compType,
        compressionOptions: { level: COMPRESSION },
      };

      switch (TYPE) {
        case "text":
        case "string":
          return await this.zip.generateAsync({
            type: "binarystring",
            ...options,
          });
        case "base64":
        case "data: URL": {
          let data = await this.zip.generateAsync({
            type: "base64",
            ...options,
          });
          if (TYPE === "data: URL")
            data = "data:application/zip;base64," + data;
          return data;
        }
        case "hex": {
          const data = await this.zip.generateAsync({
            type: "array",
            ...options,
          });
          return data
            .map((data) => data.toString(16).padStart(2, "0"))
            .join("");
        }
        case "binary": {
          const data = await this.zip.generateAsync({
            type: "array",
            ...options,
          });
          return data
            .map((data) => data.toString(2).padStart(8, "0"))
            .join("");
        }
        default:
          return "";
      }
    } catch (e) {
      console.error(
        `Zip extension: Error creating zip with type ${TYPE} compression ${COMPRESSION}:`,
        e
      );
    }
  }
  close() {
    this.zip = null;
    this.zipPath = null;
  }
  isOpen() {
    return !!this.zip;
  }

  exists( OBJECT ) {
    try {
      return !!this.getObj(
        this.normalize(this.zipPath, String(OBJECT))
      );
    } catch (e) {
      return false;
    }
  }
  async getFile( FILE, TYPE ) {
    if (!this.zip) return "";

    FILE = String(FILE);
    TYPE = String(TYPE);
    try {
      const path = this.normalize(this.zipPath, FILE);
      if (path.endsWith("/")) return "";
      const obj = this.getObj(path);
      if (!obj || obj.dir) return "";

      switch (TYPE) {
        case "text":
          return await obj.async("string");
        case "base64":
        case "data: URL": {
          let data = await obj.async("base64");
          if (TYPE === "data: URL")
            data = "data:application/octet-stream;base64," + data;
          return data;
        }
        case "hex": {
          const data = await obj.async("array");
          return data
            .map((data) => data.toString(16).padStart(2, "0"))
            .join("");
        }
        case "binary": {
          const data = await obj.async("array");
          return data
            .map((data) => data.toString(2).padStart(8, "0"))
            .join("");
        }
        default:
          return "";
      }
    } catch (e) {
      console.error(
        `Zip extension: Error getting file ${FILE} with type ${TYPE}:`,
        e
      );
      return "";
    }
  }
  async writeFile( FILE, CONTENT, TYPE ) {
    if (!this.zip) return;

    FILE = String(FILE);
    CONTENT = String(CONTENT);
    TYPE = String(TYPE);
    try {
      let path = this.normalize(this.zipPath, FILE);
      if (path.endsWith("/")) return;

      const obj = this.getObj(path);
      if (obj && obj.dir) return;

      if (path.startsWith("/")) path = path.substring(1);

      switch (TYPE) {
        case "text":
          this.zip.file(path, CONTENT, {
            createFolders: true,
          });
          break;
        case "base64":
        case "data: URL": {
          // compatibility
          if (TYPE === "data: URL")
            CONTENT = CONTENT.substring(CONTENT.indexOf(","));
          this.zip.file(path, CONTENT, {
            base64: true,
            createFolders: true,
          });
          break;
        }
        case "URL":
          {
            const resp = await fetch(CONTENT);
            this.zip.file(path, await resp.blob(), {
              base64: true,
              createFolders: true,
            });
          }
          break;
        case "hex":
          {
            if (!/^(?:[0-9A-F]{2})*$/i.test(CONTENT)) return "";
            const dataArr = this.splitIntoParts(CONTENT, 2);
            const data = Uint8Array.from(dataArr.map((o) => parseInt(o, 16)));
            this.zip.file(path, data, {
              createFolders: true,
            });
          }
          break;
        case "binary":
          {
            if (!/^(?:[01]{8})*$/i.test(CONTENT)) return "";
            const dataArr = this.splitIntoParts(CONTENT, 8);
            const data = Uint8Array.from(dataArr.map((o) => parseInt(o, 2)));
            this.zip.file(path, data, {
              createFolders: true,
            });
          }
          break;
        default:
          return "";
      }
    } catch (e) {
      console.error(
        `Zip extension: Error writing to file ${FILE} type ${TYPE}:`,
        e
      );
    }
  }
  renameFile( FROM, TO ) {
    if (!this.zip) return;

    const renameOne = (from, to) => {
      const obj = this.zip.files[from];
      this.zip.files[to] = obj;
      obj.name = to;
      delete this.zip.files[from];
    };

    FROM = String(FROM);
    TO = String(TO);
    try {
      let fromPath = this.normalize(this.zipPath, FROM);
      let fromObj = this.getObj(fromPath);
      if (!fromObj && !fromPath.endsWith("/")) {
        fromPath += "/";
        fromObj = this.getObj(fromPath);
      }
      if (!fromObj) return;
      let toPath = this.normalize(this.zipPath, TO);
      const replacedTo = TO.replaceAll(/\\/g, "/");
      const slashes = replacedTo.split("/").length - 1;
      if (
        slashes <= +fromObj.dir &&
        (slashes === 0 || replacedTo.endsWith("/"))
      ) {
        // this is a name-only change
        toPath = this.normalize(fromPath, "../" + replacedTo);
        if (fromObj.dir) {
          if (!fromPath.endsWith("/")) fromPath += "/";
        } else {
          if (fromPath.endsWith("/")) return;
        }
      }

      if (fromPath.startsWith("/")) fromPath = fromPath.substring(1);
      if (toPath.startsWith("/")) toPath = toPath.substring(1);

      // If this is a file, just renaming this one is enough
      if (!fromObj.dir) {
        renameOne(fromPath, toPath);
        return;
      }

      // Otherwise, we need to rename this object
      // and everything else in it
      if (!toPath.endsWith("/")) toPath += "/";

      // Move current directory
      if (this.zipPath.substring(1).startsWith(fromPath)) {
        this.zipPath =
          "/" + toPath + this.zipPath.substring(1).substring(fromPath.length);
      }

      for (const path in this.zip.files) {
        if (!path.startsWith(fromPath)) continue;
        const extraPath = path.substring(fromPath.length);
        renameOne(path, toPath + extraPath);
      }
      this.createFolders(toPath);
    } catch (e) {
      console.error(`Zip extension: Error renaming ${FROM} to ${TO}:`, e);
    }
  }
  deleteFile( FILE ) {
    if (!this.zip) return;

    FILE = String(FILE);
    try {
      let path = this.normalize(this.zipPath, FILE);
      if (!this.getObj(path)) return;
      if (path === "/") return;

      const shouldGoBack =
        this.getObj(path).dir && this.zipPath.startsWith(path);
      if (path.startsWith("/")) path = path.substring(1);

      this.zip.remove(path);

      if (shouldGoBack) {
        // Go back until we are in a directory that exists
        const split = this.zipPath.split("/");
        this.zipPath = "";

        let i = 0;
        while (i < split.length) {
          if (split[i] === "") {
            i++;
            continue;
          }
          const newPath = this.zipPath + split[i] + "/";
          if (!this.getObj(newPath)) break;
          this.zipPath = newPath;
          i++;
        }
        if (this.zipPath === "") this.zipPath = "/";
      }
    } catch (e) {
      console.error(`Zip extension: Error deleting file ${FILE}:`, e);
    }
  }

  setFileMeta( META, FILE, VALUE ) {
    if (!this.zip) return;

    META = String(META);
    FILE = String(FILE);
    VALUE = String(VALUE);
    try {
      const normalized = this.normalize(this.zipPath, FILE);
      const obj = this.getObj(normalized);
      if (!obj) return "";
      switch (META) {
        case "modified days since 2000":
          {
            const msPerDay = 24 * 60 * 60 * 1000;
            const start = +new Date(2000, 0, 1);
            obj.date = new Date(
              start + Number(VALUE) * msPerDay
            );
          }
          break;
        case "unix modified timestamp":
          obj.date = new Date(Number(VALUE));
          break;
        case "comment":
          obj.comment = VALUE;
          break;
        default:
          return;
      }
    } catch (e) {
      console.error(`Zip extension: Error getting ${META} of ${FILE}:`, e);
      return "";
    }
  }
  getFileMeta( META, FILE ) {
    if (!this.zip) return "";

    META = String(META);
    FILE = String(FILE);
    try {
      const normalized = this.normalize(this.zipPath, FILE);
      const obj = this.getObj(normalized);
      if (!obj) return "";
      switch (META) {
        case "name": {
          const splitPath = obj.name.split("/");
          // Directories have an extra slash at the end
          // (obj.dir is casted to 0 or 1)
          return splitPath[splitPath.length - 1 - +obj.dir] || "";
        }
        case "path":
          return "/" + obj.name;
        case "folder": {
          /** @type {Array} */
          const splitPath = obj.name.split("/");
          const folders = splitPath
            .slice(0, splitPath.length - 1 - +obj.dir)
            .join("/");
          return "/" + folders + (folders === "" ? "" : "/");
        }
        case "modification date":
          return obj.date.toLocaleString(navigator.language);
        case "long modification date":
          return new Date().toLocaleString(navigator.language, {
            dateStyle: "full",
            timeStyle: "medium",
          });
        case "modified days since 2000": {
          const msPerDay = 24 * 60 * 60 * 1000;
          const start = +new Date(2000, 0, 1);
          return (+obj.date - start) / msPerDay;
        }
        case "unix modified timestamp":
          return +obj.date;
        case "comment":
          return obj.comment || "";
        default:
          return "";
      }
    } catch (e) {
      console.error(`Zip extension: Error getting ${META} of ${FILE}:`, e);
      return "";
    }
  }

  createDir( DIR ) {
    if (!this.zip) return;
    DIR = String(DIR);
    try {
      let newPath = this.normalize(this.zipPath, DIR);
      if (!newPath.endsWith("/")) newPath += "/";
      if (newPath.startsWith("/")) newPath = newPath.substring(1);
      if (this.getObj(newPath)) return;
      this.zip.folder(newPath);
    } catch (e) {
      console.error(`Error creating directory ${DIR}:`, e);
    }
  }
  goToDir( DIR ) {
    if (!this.zip) return;
    DIR = String(DIR);
    try {
      let newPath = this.normalize(this.zipPath, DIR);
      if (!newPath.endsWith("/")) newPath += "/";
      if (!this.getObj(newPath) && newPath !== "/") return;
      this.zipPath = newPath;
    } catch (e) {
      console.error(`Error going to directory ${DIR}:`, e);
    }
  }
  getDir( DIR ) {
    if (!this.zip) return "";
    try {
      DIR = String(DIR);
      if (!DIR.endsWith("/")) DIR += "/";

      const normalized = this.normalize(this.zipPath, DIR);
      if (!this.getObj(normalized) && normalized !== "/") return "";
      const dir = normalized.substring(1);
      const length = dir.length;

      return JSON.stringify(
        Object.values(this.zip.files)
          .filter((obj) => {
            // Above the current directory
            if (!obj.name.startsWith(dir)) return false;
            // Below the current directory
            if (obj.name.substring(length).split("/").length > obj.dir + 1)
              return false;
            // Is the current directory
            if (obj.name === dir) return false;
            return true;
          })
          .map((obj) => obj.name.substring(length))
      );
    } catch (e) {
      console.error(`Zip extension: Could not get directory ${DIR}:`, e);
      return "";
    }
  }
  currentDir() {
    return this.zipPath || "";
  }

  setComment( COMMENT ) {
    if (!this.zip) return;
    this.zip.comment = String(COMMENT);
  }
  getComment( COMMENT ) {
    if (!this.zip) return "";
    return this.zip.comment || "";
  }

  normalizePath( ORIGIN, PATH ) {
    try {
      return this.normalize(
        String(ORIGIN),
        String(PATH)
      );
    } catch (e) {
      return "";
    }
  }
}