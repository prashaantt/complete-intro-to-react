import * as React from 'react'
import preload = require('../public/data.json');
import { AsyncRoute } from "./AsyncRoute";
import { Show } from "./Details";
import { RouteComponentProps } from "react-router";

interface ShowsData {
    shows: Show[];
}

const data = preload as ShowsData;

export interface RouterParams {
    id: string;
}

interface RouteConfig<T = any> {
    component: React.ComponentType<T> | React.ReactElement<any>;
    path: string;
    exact?: boolean;
    routes?: RouteConfig<T>[];
}

export const routes: RouteConfig<RouteComponentProps<RouterParams>>[] = [
    {
        path: '/',
        exact: true,
        component: (props) =>
            <AsyncRoute
                props={ props }
                loadingPromise={ import('./Landing') }
            />
    },
    {
        path: '/search',
        component: (props) =>
            <AsyncRoute
                props={ { ...{ shows: data.shows }, props } }
                loadingPromise={ import('./Search') }
            />
    },
    {
        path: '/details/:id',
        component: (props) => {
            const shows = data.shows.filter((show: Show) => props.match.params.id === show.imdbID)
            return <AsyncRoute
                props={ { ...{ show: data.shows[0] }, props } }
                loadingPromise={ import('./Details') }
            />
        }
    }
]
