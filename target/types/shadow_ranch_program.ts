export type ShadowRanchProgram = {
  "version": "0.1.0",
  "name": "shadow_ranch_program",
  "instructions": [
    {
      "name": "initializeUser",
      "docs": [
        "Initialize a new user progress account",
        "This creates a PDA account to track the user's learning progress"
      ],
      "accounts": [
        {
          "name": "userProgress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "completeChallenge",
      "docs": [
        "Complete a specific challenge",
        "This updates the bitmask to mark a challenge as completed"
      ],
      "accounts": [
        {
          "name": "userProgress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "challengeId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "completeModule",
      "docs": [
        "Complete a module (requires completing all challenges in the module)",
        "This is called when a user finishes all challenges in a learning module"
      ],
      "accounts": [
        {
          "name": "userProgress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "moduleId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "mintAchievementNft",
      "docs": [
        "Mint an achievement NFT for completing a module",
        "This performs a CPI to the Metaplex Token Metadata program"
      ],
      "accounts": [
        {
          "name": "userProgress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "moduleId",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userProgress",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The public key of the user who owns this progress account"
            ],
            "type": "publicKey"
          },
          {
            "name": "challengesCompleted",
            "docs": [
              "Bitmask tracking completion of up to 16 challenges",
              "Each bit represents a challenge: bit 0 = challenge 0, bit 1 = challenge 1, etc."
            ],
            "type": "u16"
          },
          {
            "name": "modulesCompleted",
            "docs": [
              "Bitmask tracking completion of up to 4 modules",
              "Each bit represents a module: bit 0 = module 0, bit 1 = module 1, etc."
            ],
            "type": "u8"
          },
          {
            "name": "createdAt",
            "docs": [
              "Timestamp when the account was created"
            ],
            "type": "i64"
          },
          {
            "name": "updatedAt",
            "docs": [
              "Timestamp when the account was last updated"
            ],
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidChallengeId",
      "msg": "Invalid challenge ID. Must be between 0 and 15."
    },
    {
      "code": 6001,
      "name": "InvalidModuleId",
      "msg": "Invalid module ID. Must be between 0 and 3."
    },
    {
      "code": 6002,
      "name": "Unauthorized",
      "msg": "Unauthorized. Only the account authority can perform this action."
    },
    {
      "code": 6003,
      "name": "ModuleNotComplete",
      "msg": "Module not complete. All challenges in the module must be completed first."
    }
  ]
};

export const IDL: ShadowRanchProgram = {
  "version": "0.1.0",
  "name": "shadow_ranch_program",
  "instructions": [
    {
      "name": "initializeUser",
      "docs": [
        "Initialize a new user progress account",
        "This creates a PDA account to track the user's learning progress"
      ],
      "accounts": [
        {
          "name": "userProgress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "completeChallenge",
      "docs": [
        "Complete a specific challenge",
        "This updates the bitmask to mark a challenge as completed"
      ],
      "accounts": [
        {
          "name": "userProgress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "challengeId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "completeModule",
      "docs": [
        "Complete a module (requires completing all challenges in the module)",
        "This is called when a user finishes all challenges in a learning module"
      ],
      "accounts": [
        {
          "name": "userProgress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "moduleId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "mintAchievementNft",
      "docs": [
        "Mint an achievement NFT for completing a module",
        "This performs a CPI to the Metaplex Token Metadata program"
      ],
      "accounts": [
        {
          "name": "userProgress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "moduleId",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userProgress",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The public key of the user who owns this progress account"
            ],
            "type": "publicKey"
          },
          {
            "name": "challengesCompleted",
            "docs": [
              "Bitmask tracking completion of up to 16 challenges",
              "Each bit represents a challenge: bit 0 = challenge 0, bit 1 = challenge 1, etc."
            ],
            "type": "u16"
          },
          {
            "name": "modulesCompleted",
            "docs": [
              "Bitmask tracking completion of up to 4 modules",
              "Each bit represents a module: bit 0 = module 0, bit 1 = module 1, etc."
            ],
            "type": "u8"
          },
          {
            "name": "createdAt",
            "docs": [
              "Timestamp when the account was created"
            ],
            "type": "i64"
          },
          {
            "name": "updatedAt",
            "docs": [
              "Timestamp when the account was last updated"
            ],
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidChallengeId",
      "msg": "Invalid challenge ID. Must be between 0 and 15."
    },
    {
      "code": 6001,
      "name": "InvalidModuleId",
      "msg": "Invalid module ID. Must be between 0 and 3."
    },
    {
      "code": 6002,
      "name": "Unauthorized",
      "msg": "Unauthorized. Only the account authority can perform this action."
    },
    {
      "code": 6003,
      "name": "ModuleNotComplete",
      "msg": "Module not complete. All challenges in the module must be completed first."
    }
  ]
};
