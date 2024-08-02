import { Modal } from '@/components/ui'
import { ModalProvider } from '@/context/Modal.tsx'
import { PeopleTablesProvider } from '@/context/PeopleTables.tsx'
import TablesGenerator from '@/pages/TablesGenerator'

import './App.scss'

function App() {
  return (
    <ModalProvider>
      <PeopleTablesProvider>
        <TablesGenerator />
        <Modal />
      </PeopleTablesProvider>
    </ModalProvider>
  )
}

export default App
