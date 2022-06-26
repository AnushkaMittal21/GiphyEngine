import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loading';

const Giphy = () => {
    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchdata = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: "aeIC3HmEyUiwbU1dQVYCCdLGA8CYeM0M",
                        limit: 1000
                    }
                });
                console.log(results);
                setData(results.data.data);

            } catch (err) {
                setIsError(true);
                setTimeout(() => setIsError(false), 4000);
            }
            setIsLoading(false);
        }
        fetchdata();
    }, []);

    const renderGifs = () => {
        if (isloading) {
            return <Loader />
        }
        return data.map(e => {
            return (
                <div key={e.id} className='gif'>
                    <img src={e.images.fixed_height.url} />
                </div>
            )
        })
    }

    const renderError = () => {
        if (isError) {
            return (
                <div className="alert alert-danger alert-dismissible fade show"
                    role="alert">
                    Unable to get Gifs, please try again in a few minutes
                </div>
            );
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "aeIC3HmEyUiwbU1dQVYCCdLGA8CYeM0M",
                    q: search,
                    limit: 1000
                }
            });
            setData(results.data.data);
        } catch (err) {
            setIsError(true);
            setTimeout(() => setIsError(false), 4000);
        }

        setIsLoading(false);
    };

    return (
        <div className="m-2">
            {renderError()}
            <form className="form-inline justify-content-center m-2">
                <input
                    value={search}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="search"
                    className="form-control"
                />
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary mx-2"
                >
                    Go
                </button>
            </form>
            <div className='container gifs'>{renderGifs()}</div>
        </div>
    )
}

export default Giphy