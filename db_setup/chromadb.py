import chromadb
import hashlib
from datetime import datetime

client = chromadb.PersistentClient(path="chroma_db")
collection = client.get_or_create_collection(name="job_applications")

def store_job_application(refined_resume, job_description, cover_letter):
    """Store complete job application data - UNIQUE for each person"""
    if not all([refined_resume, job_description, cover_letter]):
        return
    
    combined_key = refined_resume[:200] + job_description 
    app_id = hashlib.md5(combined_key.encode()).hexdigest()[:12]
    

    collection.add(
        documents=[job_description], 
        metadatas=[{
            "timestamp": str(datetime.now()),
            "cover_letter": cover_letter,
            "resume_snippet": refined_resume[:200], 
            "job_desc": job_description
        }],
        ids=[f"app_{app_id}"]
    )
    print("Unique job application stored in database!")

def get_similar_job_template(job_description):
    """Get similar job TEMPLATE (structure) for RAG"""
    if not job_description:
        return None
    
    results = collection.query(
        query_texts=[job_description],
        n_results=1,
        include=["metadatas", "distances"]
    )
    
    if (results["distances"] and results["distances"][0] and 
        len(results["distances"][0]) > 0 and results["distances"][0][0] < 0.8):
        
        similarity_score = 1 - results["distances"][0][0]
        if similarity_score > 0.7: 
            return {
                "similarity": similarity_score,
                "cover_letter_template": results["metadatas"][0][0]["cover_letter"]
            }
    
    return None

