import { HeaderOnly } from '~/components/Layout';

import Search from '~/pages/Search';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/@:nickname', component: Profile, layout: null },
    { path: '/search', component: Search, layout: null },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
