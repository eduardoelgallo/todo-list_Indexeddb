class DataBase {

    connection: IDBDatabase | null = null;
    name: string = "";

    constructor(private schemaUpdater: any = null) {

    }

    async createDatabase(dbName: string): Promise<IDBDatabase> {
        this.name = dbName;
        
        let openDatabaseRequest: IDBOpenDBRequest = indexedDB.open(dbName);

        return new Promise((resolve, reject) => {

            openDatabaseRequest.onsuccess = (event: Event) => {
                this.connection = (event.target as IDBOpenDBRequest).result;

                resolve(this.connection)
            };

            openDatabaseRequest.onerror = (event: Event) => {
                reject(event);
            }

            openDatabaseRequest.onupgradeneeded = (event: Event) => {
                this.connection = (event.target as IDBOpenDBRequest).result;

                this.schemaUpdater(this.connection);
                //this.updateSchema();
            }
        });
    }

	openConnection() {

    }

    async cursor(storeNames: string) : Promise<any> {
        
        return new Promise((resolve, reject) => {

            if(!this.connection || !this.isConnectionOpen()) {
                reject("Base de datos no encontrada");
                return;
            }
    
            const objectStore = this.connection.transaction(storeNames).objectStore(storeNames);
    
            let request = objectStore.openCursor();
            
            resolve((next: any) => {

                request.onsuccess = (event) => {

                    let cursor: IDBCursorWithValue = (event.target as IDBRequest).result;

                   
                    if (!cursor) {
                        return null;
                    }

                    let call = next(cursor?.value);

                    if(call === null) {
                        return null;
                    }

                    cursor.continue();
                }
            });  

            request.onerror = (event: Event) => {
                reject(event);
            }

        })    
    }

    async selectAll(storeNames: string): Promise<any> {

        return new Promise((resolve, reject) => {

            if(!this.connection || !this.isConnectionOpen()) {
                return reject("Base de datos no encontrada");
            }
    
            const objectStore = this.connection.transaction(storeNames).objectStore(storeNames);
    

            let a: any = [];

            let request = objectStore.openCursor();
            
            request.onsuccess = (event: Event) => {
                let cursor: IDBCursorWithValue = (event.target as IDBRequest).result;
    
                if (!cursor) {
                    resolve(a);
                    return;
                }
    
                a.push(cursor.value);
    
                cursor.continue();
            }

            request.onerror = (event: Event) => {
                reject(event);
            }

        })       
    }

    async executeQuery (storeNames: string) {
        
    }

    async insert (storeNames: string, data: any): Promise<any> {

        return new Promise((resolve, reject) => {

            if(!this.connection || !this.isConnectionOpen()) {
                return reject("Base de datos no encontrada");
            }
    
            let localConnection = this.connection;

            let transaction = localConnection.transaction(storeNames, "readwrite");

            transaction.oncomplete = (event: Event) => {
                resolve(event);
            }

            transaction.onerror = (event: Event) => {
                reject(event);
            }

            let objectstore = transaction.objectStore(storeNames);

            objectstore.add(data)

        })
    }

    async delete (storeNames: string, key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            
            if(!this.connection || !this.isConnectionOpen()) {
                return reject("Base de datos no encontrada");
            }

            let transaction = this.connection.transaction(storeNames, "readwrite");


            transaction.oncomplete = (event: Event) => {
                resolve(event);
            }

            transaction.onerror = (event: Event) => {
                reject(event);
            }

            transaction.objectStore(storeNames).delete(key)
        });
    }

    async update (storeNames: string, task: any): Promise<any> {
        return new Promise((resolve, reject) => {
            
            if(!this.connection || !this.isConnectionOpen()) {
                return reject("Base de datos no encontrada");
            }

            let localConnection = this.connection;

            let transaction = localConnection.transaction(storeNames, "readwrite");


            transaction.oncomplete = (event: Event) => {
                resolve(event);
            }

            transaction.onerror = (event: Event) => {
                reject(event);
            }

            let objectstore = transaction.objectStore(storeNames);

            objectstore.put(task);
        });
    }

    updateSchema(callback: any) {
        callback();
    }

    isConnectionOpen() {
        return this.connection !== null;
    }
}

export default DataBase;
