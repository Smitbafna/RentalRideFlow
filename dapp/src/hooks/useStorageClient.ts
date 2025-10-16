"use client";

import { Delegation } from "@metamask/delegation-toolkit";

export default function useStorageClient() {
  function storeDelegation(delegation: Delegation) {
    // Store in localStorage with a prefix to identify delegations
    const key = `delegation-${delegation.to}`;
    localStorage.setItem(
      key,
      JSON.stringify(delegation, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  }

  function getDelegation(delegate: string): Delegation | null {
    const key = `delegation-${delegate}`;
    const delegation = localStorage.getItem(key);
    if (!delegation) {
      return null;
    }
    return JSON.parse(delegation);
  }
  
  function getDelegations(): Delegation[] {
    const delegations: Delegation[] = [];
    
    // Look for all items in localStorage that start with 'delegation-'
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('delegation-')) {
        try {
          const delegationData = localStorage.getItem(key);
          if (delegationData) {
            delegations.push(JSON.parse(delegationData));
          }
        } catch (error) {
          console.error('Error parsing delegation:', error);
        }
      }
    }
    
    return delegations;
  }

  return { storeDelegation, getDelegation, getDelegations };
}
