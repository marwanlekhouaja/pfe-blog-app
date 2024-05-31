import { createContext } from "react";
import Routage from "../route/Routage";

const contextUser=createContext({user:{},authentified:false})

const Context=<contextUser.Provider value={{}}>
    <Routage />
</contextUser.Provider>

export default Context