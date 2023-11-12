
export  function loadState<T>(key: string): T | undefined { // короче суть создали функции для получения теперь если я вызову loadstate(data) где то то у меня data закинется сюда
  try {
    const jsonState = localStorage.getItem(key);
    if(!jsonState){
      return undefined
    }
    return JSON.parse(jsonState)
  } catch (error) {
      console.error(error);
      return undefined
  }
}

export  function saveState<T>( state: T, key: string) { // тут сохранение данных 
  const stringState = JSON.stringify(state)
  localStorage.setItem(key, stringState)
}