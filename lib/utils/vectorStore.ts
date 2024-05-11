import { Document } from '@langchain/core/documents';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

import { documentMap, vectorStoreMap } from '@/lib/data/maps';
import { PersonKey, TPerson } from '@/lib/types/person.types';
// import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export const getPersonDocuments = async ({
  personKey,
  personContext,
}: {
  personKey: PersonKey;
  personContext: string[];
  // chunkSize?: number;
  // chunkOverlap?: number;
}): Promise<Document[]> => {
  // Try to get cached docs from a local map object
  const documentsFromMap = documentMap.get(personKey);
  if (!personContext.length) return [];
  if (documentsFromMap) return documentsFromMap;

  // // Split text to cunks
  // const textSplitter = new RecursiveCharacterTextSplitter({
  //   chunkSize,
  //   chunkOverlap,
  //   separators: ['---'],
  //   keepSeparator: true,
  // });

  // // Create the documents from the splited text
  // const documents = await textSplitter.createDocuments([personContext]);

  const documents: Document[] = personContext.map(
    (text: string) => new Document({ pageContent: text })
  );

  // Save docs to documentMap
  documentMap.set(personKey, documents);

  return documents;
};

export const getVectorStoreForPerson = async (
  personData: TPerson
): Promise<MemoryVectorStore | undefined> => {
  const personKey = personData.personKey;

  // Try to get the vector store from the vectorStoreMap
  let vectorStore = vectorStoreMap.get(personKey);
  if (vectorStore) return vectorStore;

  // Create a vector store for the provided personKey
  try {
    // Create an instance for generating embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings();

    // Generate langchain documents for vector store from a context array
    const documents = await getPersonDocuments({
      personKey,
      personContext: personData.context,
      // chunkSize: personData.vectorStore.chunkSize,
      // chunkOverlap: personData.vectorStore.chunkOverlap,
    });

    // Create a vector store from the documents
    const newVectorStore = await MemoryVectorStore.fromDocuments(
      documents,
      embeddings
    );

    // Save to a local map
    vectorStoreMap.set(personKey, newVectorStore);

    return newVectorStore;
  } catch (err: any) {
    console.log(err);
  }
};

export const getVectorStoreData = async (
  personKey: PersonKey
): Promise<MemoryVectorStore | undefined> => {
  let vectorStore = vectorStoreMap.get(personKey);
  return vectorStore;
};
