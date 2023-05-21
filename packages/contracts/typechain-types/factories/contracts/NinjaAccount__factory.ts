/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  NinjaAccount,
  NinjaAccountInterface,
} from "../../contracts/NinjaAccount";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEntryPoint",
        name: "entryPoint_",
        type: "address",
      },
      {
        internalType: "contract SismoVerifier",
        name: "verifier",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [],
    name: "entryPoint",
    outputs: [
      {
        internalType: "contract IEntryPoint",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dest",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "func",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_userId",
        type: "uint256",
      },
      {
        internalType: "bytes16[]",
        name: "_groupIds",
        type: "bytes16[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes16",
        name: "",
        type: "bytes16",
      },
    ],
    name: "isGroupIdIncluded",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "tokensReceived",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "userId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "missingAccountFunds",
        type: "uint256",
      },
    ],
    name: "validateUserOp",
    outputs: [
      {
        internalType: "uint256",
        name: "validationData",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60c06040523480156200001157600080fd5b5060405162001ee738038062001ee7833981810160405281019062000037919062000241565b8173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1681525050620000af620000b760201b60201c565b50506200036c565b600060019054906101000a900460ff16156200010a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000101906200030f565b60405180910390fd5b60ff801660008054906101000a900460ff1660ff1610156200017c5760ff6000806101000a81548160ff021916908360ff1602179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860ff6040516200017391906200034f565b60405180910390a15b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001b08262000183565b9050919050565b6000620001c482620001a3565b9050919050565b620001d681620001b7565b8114620001e257600080fd5b50565b600081519050620001f681620001cb565b92915050565b60006200020982620001a3565b9050919050565b6200021b81620001fc565b81146200022757600080fd5b50565b6000815190506200023b8162000210565b92915050565b600080604083850312156200025b576200025a6200017e565b5b60006200026b85828601620001e5565b92505060206200027e858286016200022a565b9150509250929050565b600082825260208201905092915050565b7f496e697469616c697a61626c653a20636f6e747261637420697320696e69746960008201527f616c697a696e6700000000000000000000000000000000000000000000000000602082015250565b6000620002f760278362000288565b9150620003048262000299565b604082019050919050565b600060208201905081810360008301526200032a81620002e8565b9050919050565b600060ff82169050919050565b620003498162000331565b82525050565b60006020820190506200036660008301846200033e565b92915050565b60805160a051611b55620003926000396000610859015260006104b60152611b556000f3fe6080604052600436106100aa5760003560e01c8063b30e4fc211610064578063b30e4fc2146101ec578063b61d27f614610229578063bc197c8114610252578063d087d2881461028f578063e60d11be146102ba578063f23a6e61146102e3576100b1565b806223de29146100b657806301ffc9a7146100df578063150b7a021461011c5780633a871cdd146101595780635897591914610196578063b0d691fe146101c1576100b1565b366100b157005b600080fd5b3480156100c257600080fd5b506100dd60048036038101906100d89190610bfb565b610320565b005b3480156100eb57600080fd5b5061010660048036038101906101019190610d22565b61032a565b6040516101139190610d6a565b60405180910390f35b34801561012857600080fd5b50610143600480360381019061013e9190610d85565b610464565b6040516101509190610e1c565b60405180910390f35b34801561016557600080fd5b50610180600480360381019061017b9190610e92565b610479565b60405161018d9190610f10565b60405180910390f35b3480156101a257600080fd5b506101ab6104ac565b6040516101b89190610f10565b60405180910390f35b3480156101cd57600080fd5b506101d66104b2565b6040516101e39190610f8a565b60405180910390f35b3480156101f857600080fd5b50610213600480360381019061020e9190610ffd565b6104da565b6040516102209190610d6a565b60405180910390f35b34801561023557600080fd5b50610250600480360381019061024b919061102a565b6104fa565b005b34801561025e57600080fd5b50610279600480360381019061027491906110f4565b610557565b6040516102869190610e1c565b60405180910390f35b34801561029b57600080fd5b506102a461056f565b6040516102b19190610f10565b60405180910390f35b3480156102c657600080fd5b506102e160048036038101906102dc919061131f565b6105fa565b005b3480156102ef57600080fd5b5061030a6004803603810190610305919061137b565b6107c5565b6040516103179190610e1c565b60405180910390f35b5050505050505050565b60007f150b7a02000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103f557507f4e2312e0000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061045d57507f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b9050919050565b600063150b7a0260e01b905095945050505050565b60006104836107db565b61048d8484610852565b905061049c84602001356109a8565b6104a5826109ab565b9392505050565b60015481565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60026020528060005260406000206000915054906101000a900460ff1681565b6105026107db565b610551848484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610a47565b50505050565b600063bc197c8160e01b905098975050505050505050565b60006105796104b2565b73ffffffffffffffffffffffffffffffffffffffff166335567e1a3060006040518363ffffffff1660e01b81526004016105b4929190611483565b602060405180830381865afa1580156105d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f591906114c1565b905090565b60008060019054906101000a900460ff1615905080801561062b5750600160008054906101000a900460ff1660ff16105b80610658575061063a30610acb565b1580156106575750600160008054906101000a900460ff1660ff16145b5b610697576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068e90611571565b60405180910390fd5b60016000806101000a81548160ff021916908360ff16021790555080156106d4576001600060016101000a81548160ff0219169083151502179055505b8260018190555060005b825181101561076657600160026000858481518110610700576106ff611591565b5b60200260200101516fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff021916908315150217905550808061075e906115ef565b9150506106de565b5080156107c05760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860016040516107b7919061167f565b60405180910390a15b505050565b600063f23a6e6160e01b90509695505050505050565b6107e36104b2565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610850576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610847906116e6565b60405180910390fd5b565b60008060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16638e760afe868061014001906108a49190611715565b6040518363ffffffff1660e01b81526004016108c19291906117c5565b6000604051808303816000875af11580156108e0573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061090991906118b9565b915091506001548214610951576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094890611961565b60405180910390fd5b838161095c906119be565b1461099c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099390611a71565b60405180910390fd5b60009250505092915050565b50565b60008114610a445760003373ffffffffffffffffffffffffffffffffffffffff16827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff906040516109fb90611ac2565b600060405180830381858888f193505050503d8060008114610a39576040519150601f19603f3d011682016040523d82523d6000602084013e610a3e565b606091505b50509050505b50565b6000808473ffffffffffffffffffffffffffffffffffffffff168484604051610a709190611b08565b60006040518083038185875af1925050503d8060008114610aad576040519150601f19603f3d011682016040523d82523d6000602084013e610ab2565b606091505b509150915081610ac457805160208201fd5b5050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b2d82610b02565b9050919050565b610b3d81610b22565b8114610b4857600080fd5b50565b600081359050610b5a81610b34565b92915050565b6000819050919050565b610b7381610b60565b8114610b7e57600080fd5b50565b600081359050610b9081610b6a565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610bbb57610bba610b96565b5b8235905067ffffffffffffffff811115610bd857610bd7610b9b565b5b602083019150836001820283011115610bf457610bf3610ba0565b5b9250929050565b60008060008060008060008060c0898b031215610c1b57610c1a610af8565b5b6000610c298b828c01610b4b565b9850506020610c3a8b828c01610b4b565b9750506040610c4b8b828c01610b4b565b9650506060610c5c8b828c01610b81565b955050608089013567ffffffffffffffff811115610c7d57610c7c610afd565b5b610c898b828c01610ba5565b945094505060a089013567ffffffffffffffff811115610cac57610cab610afd565b5b610cb88b828c01610ba5565b92509250509295985092959890939650565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b610cff81610cca565b8114610d0a57600080fd5b50565b600081359050610d1c81610cf6565b92915050565b600060208284031215610d3857610d37610af8565b5b6000610d4684828501610d0d565b91505092915050565b60008115159050919050565b610d6481610d4f565b82525050565b6000602082019050610d7f6000830184610d5b565b92915050565b600080600080600060808688031215610da157610da0610af8565b5b6000610daf88828901610b4b565b9550506020610dc088828901610b4b565b9450506040610dd188828901610b81565b935050606086013567ffffffffffffffff811115610df257610df1610afd565b5b610dfe88828901610ba5565b92509250509295509295909350565b610e1681610cca565b82525050565b6000602082019050610e316000830184610e0d565b92915050565b600080fd5b60006101608284031215610e5357610e52610e37565b5b81905092915050565b6000819050919050565b610e6f81610e5c565b8114610e7a57600080fd5b50565b600081359050610e8c81610e66565b92915050565b600080600060608486031215610eab57610eaa610af8565b5b600084013567ffffffffffffffff811115610ec957610ec8610afd565b5b610ed586828701610e3c565b9350506020610ee686828701610e7d565b9250506040610ef786828701610b81565b9150509250925092565b610f0a81610b60565b82525050565b6000602082019050610f256000830184610f01565b92915050565b6000819050919050565b6000610f50610f4b610f4684610b02565b610f2b565b610b02565b9050919050565b6000610f6282610f35565b9050919050565b6000610f7482610f57565b9050919050565b610f8481610f69565b82525050565b6000602082019050610f9f6000830184610f7b565b92915050565b60007fffffffffffffffffffffffffffffffff0000000000000000000000000000000082169050919050565b610fda81610fa5565b8114610fe557600080fd5b50565b600081359050610ff781610fd1565b92915050565b60006020828403121561101357611012610af8565b5b600061102184828501610fe8565b91505092915050565b6000806000806060858703121561104457611043610af8565b5b600061105287828801610b4b565b945050602061106387828801610b81565b935050604085013567ffffffffffffffff81111561108457611083610afd565b5b61109087828801610ba5565b925092505092959194509250565b60008083601f8401126110b4576110b3610b96565b5b8235905067ffffffffffffffff8111156110d1576110d0610b9b565b5b6020830191508360208202830111156110ed576110ec610ba0565b5b9250929050565b60008060008060008060008060a0898b03121561111457611113610af8565b5b60006111228b828c01610b4b565b98505060206111338b828c01610b4b565b975050604089013567ffffffffffffffff81111561115457611153610afd565b5b6111608b828c0161109e565b9650965050606089013567ffffffffffffffff81111561118357611182610afd565b5b61118f8b828c0161109e565b9450945050608089013567ffffffffffffffff8111156111b2576111b1610afd565b5b6111be8b828c01610ba5565b92509250509295985092959890939650565b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611219826111d0565b810181811067ffffffffffffffff82111715611238576112376111e1565b5b80604052505050565b600061124b610aee565b90506112578282611210565b919050565b600067ffffffffffffffff821115611277576112766111e1565b5b602082029050602081019050919050565b600061129b6112968461125c565b611241565b905080838252602082019050602084028301858111156112be576112bd610ba0565b5b835b818110156112e757806112d38882610fe8565b8452602084019350506020810190506112c0565b5050509392505050565b600082601f83011261130657611305610b96565b5b8135611316848260208601611288565b91505092915050565b6000806040838503121561133657611335610af8565b5b600061134485828601610b81565b925050602083013567ffffffffffffffff81111561136557611364610afd565b5b611371858286016112f1565b9150509250929050565b60008060008060008060a0878903121561139857611397610af8565b5b60006113a689828a01610b4b565b96505060206113b789828a01610b4b565b95505060406113c889828a01610b81565b94505060606113d989828a01610b81565b935050608087013567ffffffffffffffff8111156113fa576113f9610afd565b5b61140689828a01610ba5565b92509250509295509295509295565b61141e81610b22565b82525050565b6000819050919050565b600077ffffffffffffffffffffffffffffffffffffffffffffffff82169050919050565b600061146d61146861146384611424565b610f2b565b61142e565b9050919050565b61147d81611452565b82525050565b60006040820190506114986000830185611415565b6114a56020830184611474565b9392505050565b6000815190506114bb81610b6a565b92915050565b6000602082840312156114d7576114d6610af8565b5b60006114e5848285016114ac565b91505092915050565b600082825260208201905092915050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b600061155b602e836114ee565b9150611566826114ff565b604082019050919050565b6000602082019050818103600083015261158a8161154e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006115fa82610b60565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361162c5761162b6115c0565b5b600182019050919050565b6000819050919050565b600060ff82169050919050565b600061166961166461165f84611637565b610f2b565b611641565b9050919050565b6116798161164e565b82525050565b60006020820190506116946000830184611670565b92915050565b7f6163636f756e743a206e6f742066726f6d20456e747279506f696e7400000000600082015250565b60006116d0601c836114ee565b91506116db8261169a565b602082019050919050565b600060208201905081810360008301526116ff816116c3565b9050919050565b600080fd5b600080fd5b600080fd5b6000808335600160200384360303811261173257611731611706565b5b80840192508235915067ffffffffffffffff8211156117545761175361170b565b5b6020830192506001820236038313156117705761176f611710565b5b509250929050565b600082825260208201905092915050565b82818337600083830152505050565b60006117a48385611778565b93506117b1838584611789565b6117ba836111d0565b840190509392505050565b600060208201905081810360008301526117e0818486611798565b90509392505050565b600080fd5b600067ffffffffffffffff821115611809576118086111e1565b5b611812826111d0565b9050602081019050919050565b60005b8381101561183d578082015181840152602081019050611822565b60008484015250505050565b600061185c611857846117ee565b611241565b905082815260208101848484011115611878576118776117e9565b5b61188384828561181f565b509392505050565b600082601f8301126118a05761189f610b96565b5b81516118b0848260208601611849565b91505092915050565b600080604083850312156118d0576118cf610af8565b5b60006118de858286016114ac565b925050602083015167ffffffffffffffff8111156118ff576118fe610afd565b5b61190b8582860161188b565b9150509250929050565b7f696e76616c6964207661756c7449642069640000000000000000000000000000600082015250565b600061194b6012836114ee565b915061195682611915565b602082019050919050565b6000602082019050818103600083015261197a8161193e565b9050919050565b600081519050919050565b6000819050602082019050919050565b60006119a88251610e5c565b80915050919050565b600082821b905092915050565b60006119c982611981565b826119d38461198c565b90506119de8161199c565b92506020821015611a1e57611a197fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff836020036008026119b1565b831692505b5050919050565b7f696e76616c6964207369676e6564206d65737361676500000000000000000000600082015250565b6000611a5b6016836114ee565b9150611a6682611a25565b602082019050919050565b60006020820190508181036000830152611a8a81611a4e565b9050919050565b600081905092915050565b50565b6000611aac600083611a91565b9150611ab782611a9c565b600082019050919050565b6000611acd82611a9f565b9150819050919050565b6000611ae282611981565b611aec8185611a91565b9350611afc81856020860161181f565b80840191505092915050565b6000611b148284611ad7565b91508190509291505056fea26469706673582212200bf3526f799a852f48071a69ee1cadf682b6e78986b4312cfb5431e7693988b064736f6c63430008130033";

type NinjaAccountConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NinjaAccountConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NinjaAccount__factory extends ContractFactory {
  constructor(...args: NinjaAccountConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    entryPoint_: PromiseOrValue<string>,
    verifier: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NinjaAccount> {
    return super.deploy(
      entryPoint_,
      verifier,
      overrides || {}
    ) as Promise<NinjaAccount>;
  }
  override getDeployTransaction(
    entryPoint_: PromiseOrValue<string>,
    verifier: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(entryPoint_, verifier, overrides || {});
  }
  override attach(address: string): NinjaAccount {
    return super.attach(address) as NinjaAccount;
  }
  override connect(signer: Signer): NinjaAccount__factory {
    return super.connect(signer) as NinjaAccount__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NinjaAccountInterface {
    return new utils.Interface(_abi) as NinjaAccountInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NinjaAccount {
    return new Contract(address, _abi, signerOrProvider) as NinjaAccount;
  }
}
