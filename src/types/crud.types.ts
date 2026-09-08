export interface IRepository<T, CreateInput, UpdateInput> {
    create(data: CreateInput): Promise<CreateInput>;
    update(id: string, data: UpdateInput): Promise<UpdateInput | null>;
    delete(id: string): Promise<boolean>;
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
}