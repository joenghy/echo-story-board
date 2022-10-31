import StoryList from './StoryList';

const Board = ({ error, isPending, status }) => {
    return (
        <div className="story-board">
            {error && <div>{error}</div>}
            {<header className="header">
                <h1>Story Board</h1>
            </header>}
            {isPending && <div className="loading">Loading...</div>}
            {status && <StoryList status={status}></StoryList>}
        </div>
    );
};

export default Board;