from model import Todo
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware # cors origin share => frontend is on a diferent origin

# App object
app = FastAPI()

from database import fetch_all_todos, fetch_one_todo, update_todo, remove_todo, create_todo


origins = ['https://localhost:3000']


app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


@app.get("/")
def read_root():
    return {
        "ping": "pong"
    }


@app.get("api/todo")
async def get_todo():
    response = await fetch_all_todos()
    return response


@app.get("api/todo{title}", response_model=Todo)
async def get_todo_by_id(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    else:
        raise HTTPException(404, f"there is no todo item with the title {title}")
    


@app.post("api/todo", response_model=Todo)
async def post_todot(todo:Todo):
    response = await create_todo(todo.dict())
    if response:
        return response
    else:
        raise HTTPException(400, "Something went wrong / Bad request")


@app.put("api/todo{title}", response_model=Todo)
async def put_todo(title:str, desc:str):
    response = await update_todo(title, desc)
    if response:
        return response
    else:
        raise HTTPException(400, "Something went wrong / Bad request")
    



@app.delete("api/todo{title}")
async def delete_todo(title: str):
    response = await remove_todo(title)
    if response:
        return f"Sucessfully deleted {title} Todo item"
    else:
        raise HTTPException(404, f"there is no todo item with the title {title}")
    