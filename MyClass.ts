export class MyClass {

    private fs = require('fs');
    depend_arr: string[] = new Array();
    install_arr: string[] = new Array();
    map = new Map();

    constructor() { }

    showFile() {
        let arr: string[] = new Array();
        var text = this.fs.readFileSync("./file.txt", "utf-8");
        arr = text.trim().split(/\r?\n/);
        this.commandExecute(arr);
    }

    commandExecute(arr) {
        for (var i = 0; i < arr.length; i++) {
            var line = arr[i];
            var first = line.slice(0, line.indexOf(' '))

            line = arr[i];
            var new_items = line.trim().split(" ");
            if (first == 'DEPEND') {
                console.log(line);
                new_items.splice(0, 1);
                var index = '';
                let depends: string[] = new Array();

                for (var r = 0; r < new_items.length; ++r) {
                    this.depend_arr.push(new_items[r]);

                    if (r == 0) {
                        index = new_items[r];
                    }
                    else {
                        depends.push(new_items[r]);
                    }
                }

                this.map.set(index, depends);
            } else if (first == 'INSTALL') {
                console.log(line);
                new_items.splice(0, 1);
                var count = 0;
                for (var j = 0; j < this.install_arr.length; j++) {
                    if (this.install_arr[j] == new_items)
                        count++;
                }

                if (count == 0) {
                    this.installFunction(new_items);
                } else {
                    console.log(new_items + " is already installed");
                }
            } else if (first == 'REMOVE') {
                console.log(line);
                new_items.splice(0, 1);
                this.removeFunction(new_items);
            } else if (first == 'LIS') {
                console.log(line);
                this.listFunction();
            } else {
                console.log(line);
            }
        }
    }

    installFunction(package_name) {
        this.map.forEach((value: string, key: string) => {
            if (key == package_name) {
                var present = value;

                for (var r = 0; r < present.length; ++r) {
                    if (!this.install_arr.includes(present[r])) {
                        console.log(" Installing " + present[r]);
                        this.install_arr.push(present[r]);
                    }
                }
            }
        });

        console.log(" Installing " + package_name);
        this.install_arr.push(package_name[0]);
    }

    removeFunction(package_name) {

        var count = 0;
        for (var j = 0; j < this.install_arr.length; j++) {
            if (this.install_arr[j] == package_name)
                count++;
        }

        if (count == 0) {
            console.log(package_name + " is not installed");
        } else {
            count = 0;
            for (var r = 0; r < this.depend_arr.length; ++r) {
                if (this.depend_arr[r] == package_name)
                    count++;
            }

            if (count == 1) {
                console.log(" Removing " + package_name);
                for (var i = this.depend_arr.length - 1; i >= 0; --i) {
                    if (this.depend_arr[i] == package_name) {
                        this.depend_arr.splice(i, 1);
                    }
                }
                for (var i = this.install_arr.length - 1; i >= 0; --i) {
                    if (this.install_arr[i] == package_name) {
                        this.install_arr.splice(i, 1);
                    }
                }
            } else if (count > 1) {
                // for (var i = this.depend_arr.length - 1; i >= 0; --i) {
                //     if (this.depend_arr[i] == package_name) {
                //         this.depend_arr.splice(i, 1);
                //     }
                // }
                console.log(package_name + " is still needed");
            }
        }
    }

    listFunction() {
        for (var j = 0; j < this.install_arr.length; j++) {
            console.log(" " + this.install_arr[j]);
        }
    }
}