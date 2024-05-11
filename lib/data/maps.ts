import { PersonKey } from '@/lib/types/person.types';
import { Document } from '@langchain/core/documents';
import { BufferMemory } from 'langchain/memory';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

export const messageMemoryMap = new Map<string, BufferMemory>();
export const vectorStoreMap = new Map<PersonKey, MemoryVectorStore>();
export const documentMap = new Map<PersonKey, Document[]>();
