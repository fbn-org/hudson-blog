import { Navigate, Route, Routes } from "react-router";
import Nav from "./components/Nav";
import GrillHome from "./pages/GrillHome";
import HudsonHome from "./pages/HudsonHome";
import HudsonPost from "./pages/HudsonPost";

function App() {
    return (
        <>
            <div className='min-w-screen h-auto w-screen flex flex-col justify-start items-center gap-5'>
                <div className=' w-full h-auto flex flex-col justify-center items-center'>
                    <Nav />

                    <Routes>
                        <Route index element={<Navigate to='/hudson' />} />
                        <Route path='hudson'>
                            <Route index element={<HudsonHome />} />
                            <Route path=':postId' element={<HudsonPost />} />
                        </Route>
                        <Route path='grill' element={<GrillHome />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
