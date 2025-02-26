'use client'
import { usePaginatedQuery } from "convex/react";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentTable } from "./document-table";
import { useSearchParams } from "@/hooks/use-search-params";
const Home = () => {

  const [search] = useSearchParams("search");
  const {results, status, loadMore} = usePaginatedQuery(api.documents.get, {search}, {initialNumItems : 5});
 

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
      <Navbar/>
      
      </div>
      <div className="mt-16">
        <TemplatesGallery/>

        <p></p>
       <DocumentTable
        documents={results}
        status={status}
        loadMore={loadMore}
       />
      </div>
    </div>
  )
}

export default Home 