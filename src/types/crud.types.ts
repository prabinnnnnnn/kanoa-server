export interface IRepository<T, CreateInput, UpdateInput> {
    create(data: CreateInput): Promise<T>;
    update(id: string, data: UpdateInput): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
}