import { Settings } from './settings';
import { Loadout } from './loadouts';
import { ItemAnnotation } from './item-annotations';
import { DestinyVersion } from './general';

export interface ProfileResponse {
  settings?: Settings;
  loadouts?: Loadout[];
  tags?: ItemAnnotation[];
  /** Hashes of tracked triumphs */
  triumphs?: number[];
  searches?: Search[];
}

/**
 * A list of updates for a particular profile.
 */
export interface ProfileUpdateRequest {
  platformMembershipId?: string;
  destinyVersion?: DestinyVersion;
  updates: ProfileUpdate[];
}

export interface ProfileUpdateResponse {
  results: ProfileUpdateResult[];
}

export type ProfileUpdate =
  | TagUpdate
  | TagCleanupUpdate
  | SettingUpdate
  | LoadoutUpdate
  | DeleteLoadoutUpdate
  | TrackTriumphUpdate
  | UsedSearchUpdate
  | SavedSearchUpdate;

export interface TagUpdate {
  action: 'tag';
  payload: ItemAnnotation;
}

export interface TagCleanupUpdate {
  action: 'tag_cleanup';
  payload: string[]; // Item instance IDs to delete
}

export interface SettingUpdate {
  action: 'setting';
  payload: Partial<Settings>;
  // TODO: add a param to indicate whether it's the first time so we can try just updating?
}

export interface LoadoutUpdate {
  action: 'loadout';
  payload: Loadout;
}

export interface DeleteLoadoutUpdate {
  action: 'delete_loadout';
  payload: string; // A loadout ID
}

export interface TrackTriumphUpdate {
  action: 'track_triumph';
  /** true for tracked, false for untracked */
  payload: {
    recordHash: number;
    tracked: boolean;
  };
}

/**
 * Record that a search was used.
 */
export interface UsedSearchUpdate {
  action: 'search';
  payload: {
    query: string;
  };
}

/**
 * Save or unsave a search. This is separate from marking a search as used.
 */
export interface SavedSearchUpdate {
  action: 'save_search';
  payload: {
    query: string;
    /**
     * Whether the search should be saved
     */
    saved: boolean;
  };
}

export interface ProfileUpdateResponse {
  results: ProfileUpdateResult[];
}

export interface ProfileUpdateResult {
  status: 'Success' | string;
  message?: string;
}
