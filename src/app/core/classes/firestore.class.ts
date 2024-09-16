import { AngularFirestore, AngularFirestoreCollection, QueryFn } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

export abstract class Firestore<T> {
    protected collection!: AngularFirestoreCollection<T>;

    constructor(protected db: AngularFirestore, path: string, queryFn?: QueryFn) {
        this.setCollection(path, queryFn);
    }

    protected setCollection(path: string, queryFn?: QueryFn): void {
        this.collection = this.db.collection(path, queryFn);
    }

    getAll(): Observable<T[]> {
        if (!this.collection) {
            throw new Error('Collection not initialized');
        }
        return this.collection.valueChanges();
    }
}