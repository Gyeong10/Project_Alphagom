<template>
    <div class="score-modal" tabindex="-1">
        <div class="modal-content">
        <br>
        <div class="modal-body">
            <ul>
            <li>게임 방법을 알아볼까?</li>
            <li>새 속담이 나올거야! 답을 버튼을 누르고 읽으면 돼~</li>
            </ul>
        </div>
        <div class="modal-footer">
            <button @click="gotoGame()" class="next-btn" data-bs-dismiss="modal">이제 탐험을 시작해볼까?!</button>        
        </div>
        </div>
    </div>
    </template>
      
    <script setup>
    import { useGameStore } from '@/stores/game'
    
    // store 가져오기
    const store = useGameStore()
    
    // Modal 창 끄고 게임으로 넘어가기
    const gotoGame = () => {
        store.Modal = false
    }
    
    </script>
      
    <style scoped>
    .score-modal {
    width: 60vw;
    height: 70vh;
    border-radius: 18px;
    border: 18px dashed #FAF4BD;
    background-color: #94C178;
    
    display: flex;
    justify-content: center;
    align-items: center;
    }
    
    .modal-content {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    
    }
    
    .modal-body {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    }
    
    </style>