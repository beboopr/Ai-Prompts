// Here were going to add everything that is going to be re-usable across all pages

import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Promptopia",
    description: 'Discover & share AI Prompts'
}

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <Provider>
            <div className='main'>
                <div className='gradient'/>
            </div>

            <main className='app'>
                <Nav />
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default Rootlayout