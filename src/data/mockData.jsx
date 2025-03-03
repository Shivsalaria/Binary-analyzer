export const mockAnalysis = {
    functions: [
      {
        name: "main",
        address: "0x140001000",
        size: 256,
        type: "function",
        disassembly: [
          { address: "0x140001000", instruction: "push rbp" },
          { address: "0x140001001", instruction: "mov rbp, rsp" },
          { address: "0x140001004", instruction: "sub rsp, 32" }
        ]
      },
      {
        name: "initialize",
        address: "0x140001100",
        size: 128,
        type: "function",
        disassembly: [
          { address: "0x140001100", instruction: "push rbx" },
          { address: "0x140001101", instruction: "xor eax, eax" }
        ]
      },
      {
        name: "cleanup",
        address: "0x140001180",
        size: 64,
        type: "function",
        disassembly: [
          { address: "0x140001180", instruction: "mov rax, [rbp+8]" },
          { address: "0x140001184", instruction: "ret" }
        ]
      }
    ],
    sections: [
      {
        name: ".text",
        address: "0x140001000",
        size: 4096,
        permissions: "rx",
        characteristics: "CODE|EXECUTE|READ"
      },
      {
        name: ".data",
        address: "0x140002000",
        size: 2048,
        permissions: "rw",
        characteristics: "INITIALIZED_DATA|READ|WRITE"
      },
      {
        name: ".rdata",
        address: "0x140003000",
        size: 1024,
        permissions: "r",
        characteristics: "INITIALIZED_DATA|READ"
      }
    ],
    fileInfo: {
      path: "C:/Windows/notepad.exe",
      size: 360448,
      loadedSize: 360448,
      alignment: 88,
      md5: "a96a626f8b6592ad7b3beb5ae61e3a36",
      sha1: "4e01453b36c1ef35f7c066413e5d0cac15682ef5",
      sha256: "ce5896bbea04c6e11f225a758849f202b7ff8820fe8228e7dae8639170bd8cb9"
    }
  };