import { Navigate, Route, Routes } from "react-router";
import Nav from "./components/Nav";
import GrillHome from "./pages/GrillHome";
import HudsonHome from "./pages/HudsonHome";
import HudsonPost from "./pages/HudsonPost";

function App() {
    return (
        <>
            <div className='min-w-screen min-h-screen h-screen w-screen bg-amber-50 flex flex-col justify-start items-center gap-5'>
                <div className=' w-full h-auto flex flex-col justify-center items-center overflow-hidden'>
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
