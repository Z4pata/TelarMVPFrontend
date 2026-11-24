import { useCallback, useState } from 'react'
import { logout } from './features/auth/authService'
import { LoginPage } from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { AccountDetailPage } from './features/accounts/pages/AccountDetailPage'
import { HomePage } from './features/finance/pages/HomePage'

type View = 'login' | 'register' | 'home' | 'account'

const REGISTER_SUCCESS_NOTICE = 'Tu cuenta está lista. Inicia sesión para continuar.'
const SESSION_EXPIRED_NOTICE = 'Tu sesión terminó. Inicia sesión de nuevo.'

function App() {
  const [view, setView] = useState<View>('login')
  const [notice, setNotice] = useState<string>()
  const [selectedAccountId, setSelectedAccountId] = useState<number>()

  const goToLogin = useCallback((message?: string) => {
    setNotice(message)
    setView('login')
  }, [])

  const handleSessionExpired = useCallback(() => goToLogin(SESSION_EXPIRED_NOTICE), [goToLogin])

  async function handleLogout() {
    try {
      await logout()
    } finally {
      goToLogin()
    }
  }

  if (view === 'register') {
    return (
      <RegisterPage
        onRegistered={() => goToLogin(REGISTER_SUCCESS_NOTICE)}
        onGoToLogin={() => goToLogin()}
      />
    )
  }

  function openAccount(cuentaId: number) {
    setSelectedAccountId(cuentaId)
    setView('account')
  }

  if (view === 'account' && selectedAccountId !== undefined) {
    return (
      <AccountDetailPage
        cuentaId={selectedAccountId}
        onBack={() => setView('home')}
        onDeleted={() => setView('home')}
        onLogout={handleLogout}
        onSessionExpired={handleSessionExpired}
      />
    )
  }

  if (view === 'home') {
    return <HomePage onLogout={handleLogout} onSessionExpired={handleSessionExpired} onOpenAccount={openAccount} />
  }

  return (
    <LoginPage
      notice={notice}
      onLoggedIn={() => setView('home')}
      onGoToRegister={() => setView('register')}
    />
  )
}

export default App
