import React from 'react';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();

    return (
        <footer
            style={{
                position: 'relative', // Change to relative
                bottom: 0,
                left: 0,
                width: '100%',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                textAlign: 'left',
                padding: '10px',
                fontSize: '16px',
            }}
        >
            Created by Siyanda Burnham
            <a
                href="https://github.com/SiyandaMaykiso/AI-Powered-Content-Summarizer.git"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    color: theme.palette.primary.main,
                    marginLeft: '15px',
                    textDecoration: 'none',
                }}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    alt="GitHub Logo"
                    style={{
                        width: '24px',
                        height: '24px',
                        verticalAlign: 'middle',
                        filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                    }}
                />
            </a>
            <a
                href="https://www.linkedin.com/in/siyanda-burnham/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    color: theme.palette.primary.main,
                    marginLeft: '15px',
                    textDecoration: 'none',
                }}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    alt="LinkedIn Logo"
                    style={{
                        width: '24px',
                        height: '24px',
                        verticalAlign: 'middle',
                        filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                    }}
                />
            </a>
        </footer>
    );
};

export default Footer;