import Editor from './Editor';
import Story from './Story';
import Board from './Board';
import Home from './Home';
import About from './About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useFetch from '../libs/useFetch';

const App = () => {
    const { error, isPending, data: status } = useFetch("http://localhost:8080/api/story/status");

    return (
        <Router>
            <div>
                <Home />
                <div>
                    <Routes>
                        <Route path="/editor" element={<Editor error={error} isPending={isPending} status={status} />} />
                        <Route path="/board" element={<Board error={error} isPending={isPending} status={status} />} />
                        <Route path="/board/:storyTitle" element={<Story />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;