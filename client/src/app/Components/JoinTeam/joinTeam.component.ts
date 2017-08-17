import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'joinTeam',
    templateUrl: 'joinTeam.component.html',
    styleUrls: [ 'joinTeam.component.css']
})
export class JoinTeamComponent {
    joinTeamControl: FormControl;
    teams = [
        "Team1",
        "asd"
    ];
    filteredTeams: any;

    ngOnInit() {
        this.joinTeamControl = new FormControl();

        /*this.filteredTeams = this.joinTeamControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val));*/
    }

    filter(val: string) {
        return val ? this.teams.filter(t => t.toLowerCase().indexOf(val.toLowerCase()) === 0)
            : this.teams;
    }
}
