import React, { useEffect } from 'react';

const GoogleSignIn = ({ onSuccess, onError }) => {
  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '867560531415-cjhpfel057r1ji9ubvkpgj5dlnp7v0s1.apps.googleusercontent.com', // Replace with your actual Google Client ID
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'filled_blue',
            size: 'large',
            type: 'standard',
            shape: 'rectangular',
            text: 'signin_with',
            logo_alignment: 'left',
            width: 250,
          }
        );
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response) => {
    try {
      // Decode the JWT token to get user info
      const userInfo = JSON.parse(atob(response.credential.split('.')[1]));
      console.log('Google Sign-In Success:', userInfo);
      
      if (onSuccess) {
        onSuccess({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          token: response.credential
        });
      }
    } catch (error) {
      console.error('Error processing Google Sign-In:', error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-white text-sm font-medium">Or continue with</div>
      <div 
        id="google-signin-button" 
        className="transform hover:scale-105 transition-transform duration-200"
      ></div>
    </div>
  );
};

export default GoogleSignIn;