    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
          phone: formData.phone
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to login (no alert popup)
        navigate('/login')
      } else {
        setError(data.detail || 'Registration failed. Please try again.')
      }
    } catch (err) {
