const phones = [
    {
        id: "galaxy-z-fold7",
        brand: "samsung",
        name: "Galaxy Z Fold7",
        family: "Galaxy Z Fold",
        year: 2025,
        type: "Foldable",

        tagline: "The ultra-thin Galaxy foldable.",

        description:
            "Samsung's flagship book-style foldable smartphone, combining a large inner display with a conventional cover display.",

        display: {
            inner: "8.0-inch Dynamic AMOLED 2X",
            outer: "6.5-inch Dynamic AMOLED 2X",
            refreshRate: "Up to 120Hz",
            resolution: "2184 × 1968 inner display",
            specialFeatures: [
                "HDR",
                "Adaptive refresh rate",
                "Foldable display"
            ]
        },

        processor: {
            name: "Snapdragon 8 Elite for Galaxy",
            cpu: "Qualcomm Oryon CPU",
            gpu: "Adreno GPU"
        },

        memory: {
            ram: [
                "12GB",
                "16GB"
            ],
            storage: [
                "256GB",
                "512GB",
                "1TB"
            ]
        },

        camera: {
            rear: [
                "200MP main",
                "12MP ultra-wide",
                "10MP telephoto"
            ],
            front: "Under-display / cover-camera system",
            features: [
                "Optical image stabilization",
                "Night photography",
                "Portrait photography",
                "AI-assisted image processing"
            ]
        },

        battery: {
            capacity: "4400mAh",
            charging: "Fast wired charging",
            wireless: true
        },

        physical: {
            weight: "215g",
            durability: "IP48",
            formFactor: "Book-style foldable"
        },

        connectivity: [
            "5G",
            "Wi-Fi 7",
            "Bluetooth 5.4",
            "USB-C",
            "NFC"
        ],

        software: {
            operatingSystem: "Android",
            interface: "One UI",
            features: [
                "Galaxy AI",
                "Samsung DeX",
                "Multitasking"
            ]
        },

        highlights: [
            "Large foldable inner display",
            "Ultra-thin foldable design",
            "200MP main camera",
            "Galaxy AI",
            "Samsung DeX"
        ]
    },


    {
        id: "iphone-duo",
        brand: "apple",
        name: "iPhone Duo",
        family: "iPhone Duo",
        year: 2026,
        type: "Foldable",

        tagline: "Apple's first foldable iPhone.",

        description:
            "A book-style foldable iPhone combining a compact outer display with a larger inner folding display.",

        display: {
            inner: "7.6-inch Super Retina XDR OLED",
            outer: "5.4-inch Super Retina XDR OLED",
            refreshRate: "ProMotion up to 120Hz",
            resolution: "1878 × 2670 inner display",
            specialFeatures: [
                "Always-On display",
                "HDR",
                "True Tone",
                "P3 wide color",
                "Dynamic Island"
            ]
        },

        processor: {
            name: "A20 Pro",
            cpu: "6-core CPU",
            gpu: "7-core GPU",
            neuralEngine: "Dual 16-core Neural Engine",
            process: "2nm-class"
        },

        memory: {
            storage: [
                "256GB",
                "512GB",
                "1TB",
                "2TB"
            ]
        },

        camera: {
            rear: [
                "48MP Fusion Main",
                "48MP Fusion Ultra Wide",
                "12MP optical-quality 2x Telephoto"
            ],
            front: "12MP Center Stage camera",
            features: [
                "Night mode",
                "Portrait mode",
                "Macro photography",
                "Smart HDR 5",
                "Photographic Styles"
            ],
            video: "Up to 4K Dolby Vision at 60fps"
        },

        battery: {
            typicalUse: "Up to 24 hours",
            charging: "Up to 50% in around 20 minutes with a compatible 60W or higher adapter",
            magsafe: "Up to 25W",
            qi2: "Up to 25W"
        },

        physical: {
            material: "Titanium",
            weight: "254g",
            protection: "IP68",
            colors: [
                "Night Sky",
                "Star White"
            ]
        },

        connectivity: [
            "5G",
            "Wi-Fi 7",
            "Bluetooth 6",
            "USB-C",
            "NFC",
            "Thread",
            "Dual eSIM"
        ],

        software: {
            operatingSystem: "iOS 27",
            security: "Touch ID",
            features: [
                "Apple Intelligence",
                "Apple Pencil USB-C support",
                "MagSafe"
            ]
        },

        highlights: [
            "7.6-inch inner display",
            "A20 Pro",
            "48MP camera system",
            "Titanium design",
            "Touch ID",
            "iOS 27"
        ]
    },


    {
        id: "nothing-phone-3",
        brand: "nothing",
        name: "Nothing Phone (3)",
        family: "Nothing Phone",
        year: 2025,
        type: "Smartphone",

        tagline: "A distinctive smartphone built around design.",

        description:
            "Nothing's flagship smartphone combining its distinctive hardware design with Nothing OS and the Glyph interface.",

        display: {
            main: "6.67-inch AMOLED",
            type: "AMOLED",
            refreshRate: "High refresh rate display",
            features: [
                "HDR",
                "High brightness",
                "Always-on display"
            ]
        },

        memory: {
            ram: [
                "12GB"
            ],
            storage: [
                "256GB"
            ]
        },

        camera: {
            rear: [
                "50MP main",
                "50MP ultra-wide",
                "50MP telephoto"
            ],
            front: "50MP front camera",
            features: [
                "Multiple 50MP sensors",
                "Optical image stabilization",
                "AI photography"
            ]
        },

        battery: {
            capacity: "Large-capacity battery",
            wireless: true
        },

        software: {
            operatingSystem: "Android",
            interface: "Nothing OS",
            features: [
                "Glyph Interface",
                "Essential Space",
                "Clean interface"
            ]
        },

        highlights: [
            "6.67-inch AMOLED",
            "Multiple 50MP cameras",
            "Glyph Interface",
            "Nothing OS",
            "Wireless charging"
        ]
    },


    {
        id: "oneplus-15",
        brand: "oneplus",
        name: "OnePlus 15",
        family: "OnePlus Number Series",
        year: 2025,
        type: "Smartphone",

        tagline: "Performance-focused OnePlus flagship.",

        description:
            "A OnePlus flagship focused on high performance, fast charging, high refresh-rate display technology and OxygenOS.",

        display: {
            main: "6.78-inch LTPO display",
            resolution: "1.5K",
            refreshRate: "Up to 165Hz",
            features: [
                "LTPO",
                "High refresh rate",
                "Adaptive refresh"
            ]
        },

        processor: {
            name: "Snapdragon 8 Elite Gen 5",
            gpu: "Adreno GPU"
        },

        memory: {
            ram: [
                "LPDDR5X Ultra+"
            ],
            storage: [
                "UFS 4.1"
            ]
        },

        battery: {
            capacity: "7300mAh",
            wiredCharging: "120W",
            wirelessCharging: "50W"
        },

        software: {
            operatingSystem: "Android",
            interface: "OxygenOS 16",
            features: [
                "Performance optimization",
                "Multitasking",
                "AI features"
            ]
        },

        highlights: [
            "165Hz LTPO display",
            "Snapdragon 8 Elite Gen 5",
            "7300mAh battery",
            "120W wired charging",
            "50W wireless charging",
            "OxygenOS 16"
        ]
    }
];
