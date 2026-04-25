export interface Colour {
    id: number;
    documentId: string;
    name: string;
    hex: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    colour: Colour;
}

export interface Series {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    colour: Colour;
}

export interface Blocks {
    id: number;
    __component: string;
    body: string;
}

export interface Article {
    id: number;
    documentId: string;
    title: string;
    description: string | null;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    categories: Category[];
    series: Series | null;
    blocks: Blocks[];
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface Meta {
    pagination: Pagination;
}

export interface StrapiCollectionResponse<T> {
    data: T[];
    meta: Meta;
}

export type ArticlesResponse = StrapiCollectionResponse<Article>;