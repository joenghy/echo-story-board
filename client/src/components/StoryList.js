import { Link } from 'react-router-dom';

const StoryList = ({ status }) => {
    return (
        <div className="story-list">
            {<table>
                <tbody>
                    <tr>
                        <th>Story Name</th>
                        <th>Views</th>
                        <th>Downloads</th>
                    </tr>
                    {status.stories.map(story => (
                        <tr key={story.title}>
                            <td>
                                <Link to={`/board/${story.title.split('.png')[0]}`}>
                                    <p>{story.title.split(".png")[0]}</p>
                                </Link>
                            </td>
                            <td>{story.views}</td>
                            <td>{story.downloads}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    );
};

export default StoryList;