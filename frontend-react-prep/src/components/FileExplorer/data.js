export const initialData = [
    {
        id: 'src',
        name: 'src',
        type: 'folder',
        children: [
            {
                id: 'components',
                name: 'components',
                type: 'folder',
                children: [
                    {
                        id: 'button',
                        name: 'button.tsx',
                        type: 'file',
                        extension: 'tsx'
                    },
                    {
                        id: 'card',
                        name: 'card.tsx',
                        type: 'file',
                        extension: 'tsx'
                    },
                    {
                        id: 'input',
                        name: 'input.tsx',
                        type: 'file',
                        extension: 'tsx'
                    }
                ]
            },
            {
                id: 'utils',
                name: 'utils',
                type: 'folder',
                children: [
                    {
                        id: 'formatters',
                        name: 'formatters.ts',
                        type: 'file',
                        extension: 'ts'
                    },
                    {
                        id: 'validations',
                        name: 'validations.ts',
                        type: 'file',
                        extension: 'ts'
                    }
                ]
            },
            {
                id: 'app',
                name: 'app.tsx',
                type: 'file',
                extension: 'tsx'
            },
            {
                id: 'index',
                name: 'index.tsx',
                type: 'file',
                extension: 'tsx'
            }
        ]
    },
    {
        id: 'public',
        name: 'public',
        type: 'folder',
        children: [
            {
                id: 'favicon',
                name: 'favicon.ico',
                type: 'file',
                extension: 'ico'
            },
            {
                id: 'logo',
                name: 'logo.png',
                type: 'file',
                extension: 'png'
            }
        ]
    },
    {
        id: 'package',
        name: 'package.json',
        type: 'file',
        extension: 'json'
    },
    {
        id: 'tsconfig',
        name: 'tsconfig.json',
        type: 'file',
        extension: 'json'
    },
    {
        id: 'readme',
        name: 'README.md',
        type: 'file',
        extension: 'md'
    }
];