import '../styles/global.css'
import Sidebar from '../components/dashboard/sidebar.component'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}

// The default export of _app.js is a top-level React component that
// wraps all the pages in your application. You can use this component
// to keep state when navigating between pages, or to add global styles as
// we're doing here. Learn more about _app.js file.



