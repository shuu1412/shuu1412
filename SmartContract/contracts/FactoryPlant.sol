// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@openzeppelin/contracts/security/Pausable.sol";


contract FactoryPlant is VRFConsumerBaseV2, Ownable, Pausable {
    VRFCoordinatorV2Interface COORDINATOR;

    uint64 s_subscriptionId;

    address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;

    bytes32 keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;

    uint32 callbackGasLimit = 100000;
    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;
    uint32 numWords =  2;
    uint256[] private s_randomWords;
    uint16[3][5] private plantRule;

    event UpdatePlantRule(uint16[3][5] plantRuleNew);

    constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator){
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        /* plantRule
            |           | min  | mid  | max  |
            | --------- | ---- | ---- | ---- |
            | suncost   | 25   | 262  | 500  |
            | damage    | 20   | 310  | 600  |
            | toughness | 300  | 2650 | 5000 |
            | recharge  | 1    | 15   | 30   |
            | speed     | 1    | 4    | 7    |
        */
        plantRule = [
            [25, 262, 500],
            [20, 310, 600],
            [300, 2650, 5000],
            [1, 15, uint16(30)],
            [1, 4, uint16(7)]
        ];

    }

    function _requestRandomWords() internal returns(uint256) {
    // Will revert if subscription is not set and funded.
        uint256 s_requestId = COORDINATOR.requestRandomWords(
        keyHash,
        s_subscriptionId,
        requestConfirmations,
        callbackGasLimit,
        numWords
        );
        return s_requestId;
    }
     
    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
    }
    
    function _randomNumber(uint16 min, uint16 max, uint256 requestRandomNumber) internal view returns(uint16) {
        uint16 _result =  min + uint16( (requestRandomNumber + block.timestamp )  % (max - min + 1));
        return _result;
    }

    function updatePlantRule(uint16[3][5] memory _newPlantRule) public onlyOwner() whenPaused() {
        plantRule = _newPlantRule;
        emit UpdatePlantRule(_newPlantRule);
    }

    function getPlantRule() public view onlyOwner() returns(uint16[3][5] memory) {
        return plantRule;
    }
 
    function _randomPropertiesPlant(bool isVip) internal returns(uint16[5] memory) {
        uint256 requestRandomNumber = _requestRandomWords();
        uint16[5] memory plantProperties;
        bool[5] memory propertieHigh;
        //uint16[5][3] memory rulePlantInArray = _rulePlantInArray();
        propertieHigh[requestRandomNumber % 3] = true;
        propertieHigh[(requestRandomNumber % 2) + 3] = true;

        for(uint _i = 0; _i < 5 ;_i++) {
            if(propertieHigh[_i] != isVip) {
                plantProperties[_i] = _randomNumber(plantRule[_i][1], plantRule[_i][2], requestRandomNumber);
            }
            else {
                plantProperties[_i] = _randomNumber(plantRule[_i][0], plantRule[_i][1], requestRandomNumber);
            }
        }
        return plantProperties;
    }
     
}